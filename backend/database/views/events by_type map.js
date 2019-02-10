module.exports = function(doc) {
	if (doc.type == "event") {
		emit([doc.event_type, doc.date], null);
	}
};