IMAGE=js-api-gateway

TIMESTAMP=$(date -u +%F-%H%M%S)
REGISTRY_HOST="cloud.canister.io:5000"
REGISTRY_NAMESPACE="js"

MODE="local"
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -p|--production)
        MODE="prod"
        shift
        ;;
    esac
done

build_prod() {
    if [[ -z "$CANISTER_PASSWORD" ]]; then
        echo "canister.io: CANISTER_PASSWORD undefined" 1>&2
        exit 1
    fi

    docker build . -t "${IMAGE}" -t "${IMAGE}:${TIMESTAMP}" -t "${REGISTRY_HOST}/${REGISTRY_NAMESPACE}/${IMAGE}"
    docker login --username ${REGISTRY_NAMESPACE} --password=${CANISTER_PASSWORD} ${REGISTRY_HOST}
    docker push "${REGISTRY_HOST}/${REGISTRY_NAMESPACE}/${IMAGE}"
}

build_local() {
    docker build . -t "${IMAGE}" -t "${IMAGE}:${TIMESTAMP}"
}

if [[ $MODE == "prod" ]]; then
    echo "Building a production image and pushing to image registry"
    build_prod
else
    echo "Building a local image"
    build_local
fi
