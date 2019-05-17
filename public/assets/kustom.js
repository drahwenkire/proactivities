var kustom = {
    httpGET: function (url, callback) {
        var request = new XMLHttpRequest()

        request.open('GET', url, true)

        request.onload = function () {
            if ((request.status >= 200 && request.status < 400) ||
                (window.location.protocol == 'file:' && request.status == 0)) {
                callback(this.response)
            } else {
                console.log('ERROR!', request.status, this.response)
                alert('ERROR! httpGET (See console for details)')
            }
        }

        request.send()
    },
    httpPOST: function (filename, data, url) {
        // httpPOST(filename, data, url, mimetype) {
        // mimetype = mimetype || kustom.mimetypeFromExtension(filename)

        url = url || 'SavedData'
        const json = {
            filename,
            data
        }
        console.log(json)

        var request = new XMLHttpRequest()
        request.open('POST', url)
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        request.send(JSON.stringify(json))
    },
    mimetypeFromExtension: function (str) {
        str = kustom.extensionFromFilename(str)

        const mimetypes = {
            'json': 'application/json',
            'csv': 'text/csv'
        }

        return mimetypes[str] ? mimetypes[str] : 'text/plain'
    },
    extensionFromFilename: function (str) {
        return str.split('.').length > 1 ? str.split('.').slice(-1) : str
    },
    airtableAPIfromName: function (airtable_name, callback) {
        // https://medium.com/row-and-table/an-basic-intro-to-the-airtable-api-9ef978bb0729
        const AIRTABLE_API = 'key7byLQ9pZph6XJ1' // belongs to cryptokire@gmail.com (use diordnakire to share with read-only permissions)
        // Go to airtable page, click 'HELP' in upper-right, then 'API documentation', then go to AUTHENTICATION and copy curl's EXAMPLE USING QUERY PARAMETER
        const airtable_urls = [{
                name: 'Crypto',
                url: 'https://api.airtable.com/v0/appCk9mgFV9ziRgxG/Main%20Table?api_key=YOUR_API_KEY'
            },
            {
                name: 'Known Crypto Addresses',
                url: 'https://api.airtable.com/v0/applS7Mkh8FSJNXBN/Table%201?api_key=YOUR_API_KEY'
            }
        ]

        const find = airtable_urls.find(at => at.name == airtable_name)

        if (find) {
            const url = find.url.replace('YOUR_API_KEY', AIRTABLE_API)
            console.log(url)

            callback = callback || function (res) {
                const data = JSON.parse(res)
                console.log(data)
            }
            // set a custom callback to check for offsets then cycle through, then run the passed in callback
            kustom.httpGET(url, callback)
            // maybe also save to server
        } else {
            console.log(airtable_name + ' not found', airtable_urls)
            alert('ERROR! ' + airtable_name + ' not found')
        }
    }
}