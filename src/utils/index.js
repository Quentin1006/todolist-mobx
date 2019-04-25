exports.firstToCap = (string) => {
    return string.split(" ")
        .map(el => (
            (el[0]).toUpperCase() + el.substr(1)
        )).join(" ")
}


exports.arrayMoveMutate = (array, from, to) => {
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

exports.arrayMove = (array, from, to) => {
	array = array.slice();
	this.arrayMoveMutate(array, from, to);
	return array;
};