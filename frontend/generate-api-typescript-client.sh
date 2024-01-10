docker run --rm  -v "${PWD}:/local" openapitools/openapi-generator-cli generate  \
    -i http://host.docker.internal:5000/openapi.json \
    -g typescript-axios \
    -o /local/src/api/generated
