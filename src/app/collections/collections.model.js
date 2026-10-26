const booksValidationSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
            title: {
                bsonType: "string",
                minLength: 1,
                description: "title must be a non-empty string and is required"
            }
        }
    }
};

const cappedLogsOptions = {
    capped: true,
    size: 1048576
};

const booksTitleIndex = {
    title: 1
};

module.exports = {
    booksValidationSchema,
    cappedLogsOptions,
    booksTitleIndex
};
