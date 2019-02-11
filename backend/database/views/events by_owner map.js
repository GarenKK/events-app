module.exports = function(doc) {
	if (doc.type == "event") {
		emit([doc.owner, doc.date], null);
	}
};