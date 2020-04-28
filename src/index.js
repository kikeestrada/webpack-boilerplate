import {hello, bye} from "./js-modules/example";
import sass from './scss/main.scss';
import logo from './img/img1.jpg';
import data from './data/data.json';
hello();
bye();
 console.log(data);

(()=>{
	if (document.body.classList.contains('home')) {
		// functions here
	}else if (document.body.classList.contains('page2')) {
		// functions here
	}else if (document.body.classList.contains('page3')) {
		// functions here
	}
})();
