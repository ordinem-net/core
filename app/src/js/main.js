const HTMLSpechialChar = {
	'&#39;': '\"',
	'&lt;': '\<',
	'&gt;': '\>',
	'&guot;': '\"',
	'&#x2F;': '\/'
};

function fixJsObj(str) {
	let fix_obj_str = str;
	for (let el in HTMLSpechialChar) {
		fix_obj_str = fix_obj_str.replace(new RegExp(el,'g'), HTMLSpechialChar[el]);
	}

	return JSON.parse(fix_obj_str);
}