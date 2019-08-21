'use strict'

class ApiResponse {
	// Meets RFC 7807
	/**
	 * @param {string} title of the message
	 * @param {string} detail for the message
	 * @param {number} status http status code
	 * @param {object} data This is a custom attribute
	 */
	constructor(title, detail, status, data) {
		this._title = title || ''
		this._detail = detail || ''
		this._status = status || ''
		this._data = null || data
	}

	get response() {
		return {
			title: this._title,
			detail: this._detail,
			status: this._status,
			data: this._data
		}
	}
}

const messages = {
	response200: (data) => {
		let response = new ApiResponse('Success', 'Ok', 200, data)
		return response.response
	},

	response201: (data) => {
		let response = new ApiResponse('Created', 'Resource was created', 201, data)
		return response.response
	},

	response304: (data) => {
		let response = new ApiResponse("Not Modified", "Request resource remains unchanged.", 304, data)
		return response.response
	},

	response400: (detail) => {
		let response = new ApiResponse("Bad request", detail || "Bad request", 400)
		return response.response
	},

	response401: (message) => {
		let response = new ApiResponse("Unauthorized", message || "Login failed.", 401)
		return response.response
	},

	response403: (detail) => {
		let response = new ApiResponse("Forbidden", detail || "Permissions issue.", 403)
		return response.response
	},

	response404: (path) => {
		let response = new ApiResponse("Not Found", "Page '" + path + "'" + " was not found.", 404)
		return response.response
	},

	response405: (method) => {
		let response = new ApiResponse("Unsupported Method Type", "Unsupported Method Type - " + method, 405)
		return response.response
	},

	response415: (contentType) => {
		let response = new ApiResponse("Unsupported Media Type", "Unsupported Media Type - " + contentType, 415)
		return response.response
	},

	response429: (message) => {
		let response = new ApiResponse("Too Many Requests", message || "Too Many Requests", 429)
		return response.response
	},

	response500: (message) => {
		let response = new ApiResponse("Internal Server Error", message || "Internal Server Error", 500)
		return response.response
	}
}


module.exports = messages
