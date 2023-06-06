import { createGlobalStyle } from "styled-components";

const ResetStyle = createGlobalStyle`
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
	time, mark, audio, video{
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		margin: 0;
		line-height: 1;
		background-color: rgba(51,51,51);
	}
	ol, ul {
		list-style: none;
	}
	input, input:focus, input:active, input:visited, input:hover{
		border: none;
		outline: none;
		padding-left: 12px;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	a:hover {
		color: #535bf2;
	}
	button {
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.25s;
	}
	button:hover {
		border-color: #646cff;
	}
	button:focus,
	button:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}
	@import url('https://fonts.googleapis.com/css2?family=Marck+Script&family=Passion+One:wght@400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;700&display=swap');

	body {
		font-family: 'Lato', sans-serif;
		overflow-x: hidden;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: 'Passion One', sans-serif;
		font-weight: 700;
	}

	p {
		font-family: 'Oswald', sans-serif;
		font-weight: 700;
	}
	* {
		box-sizing: border-box;
	}
`;

export default ResetStyle;
