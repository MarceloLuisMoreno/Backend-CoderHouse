import React from "./vendor/https/dev.jspm.io/react/index.js"
import ReactDOMServer from "./vendor/https/dev.jspm.io/react-dom/server.js"
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts"

const app = createApp()
const colors: string[] = []

const body = () =>
	ReactDOMServer.renderToString(
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Colors</title>
			</head>
			<body style={{ background: "#5a034f", color: "#FFF" }}>
				<form method="POST">
					<label htmlFor="color">Pick a color</label>
					<br />
					<input type="text" id="color" name="color" />
					<br />
					<input type="submit" value="Send" />
				</form>
				{!!colors.length && (
					<ul>
						{colors.map((color, i) => (
							<li key={i} style={{ color }}>
								{color}
							</li>
						))}
					</ul>
				)}
			</body>
			<footer>
				<br />
				<br />
				<p>Copyright 2022 - CoderHouse - Marcelo Luis Moreno</p>
			</footer>
		</html>
	)

app.get("/", (req) =>
	req.respond({
		status: 200,
		headers: new Headers({
			"content-type": "text/html; charset=UTF-8",
		}),
		body: body(),
	})
)

app.post("/", async (req) => {
	const color = (await req.formData()).value("color")
	if (color) {
		colors.push(color)
	}
	req.respond({
		status: 200,
		headers: new Headers({
			"content-type": "text/html; charset=UTF-8",
		}),
		body: body(),
	})
})

app.listen({
	port: 8080,
})
