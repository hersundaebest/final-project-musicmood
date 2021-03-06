import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
	--primary-color: #F0EBF4;
	--secondary-color: #303030;
      --page-horizontal-padding: 20px;
    }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font-family: 'Poppins', sans-serif;
	vertical-align: baseline;
	letter-spacing: 2px;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	background: linear-gradient(-60deg, #F0EBF4, #A1C3D1, #B39BC8, #F172A1, #E64398);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

html, body, #root {
  height: 100%;
}
`;
