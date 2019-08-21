/**
 * Extracts documents from Firebase QuerySnapshot into array.
 * @param {Object} querySnapshot Firebase QuerySnapshot
 * @returns {Array}
 */
const extractDocsFromSnapshot = querySnapshot => {
	let documents = [];
	querySnapshot.forEach(doc => {
		documents.push(doc.data());
	});
	return documents;
}


module.exports = {
  extractDocsFromSnapshot,
}