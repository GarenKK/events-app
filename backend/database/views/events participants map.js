module.exports = function(doc) {
	if (doc.type == "event") {
		for (i in doc.participants) {
			emit(doc._id, {_id: doc.participants[i]});
		}
	}
};