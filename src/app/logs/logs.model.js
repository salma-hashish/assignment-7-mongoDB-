const { ObjectId } = require('mongodb');

function formatLogDoc(log) {
    const doc = { ...log };
    if (doc.book_id && typeof doc.book_id === 'string' && ObjectId.isValid(doc.book_id)) {
        try {
            doc.book_id = new ObjectId(doc.book_id);
        } catch {
        }
    }
    return doc;
}

const defaultLog = {
    book_id: "64b5c2d8a123456ef8914",
    action: "borrowed"
};

module.exports = {
    formatLogDoc,
    defaultLog
};
