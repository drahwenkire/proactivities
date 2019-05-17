var abc = ''

var vm = new Vue({
    el: '#app',
    data: {
        tasks: [],
        reports: []
    },
    computed: {

    },
    methods: {
        getSavedData(file) {
            const directory = 'SavedData'

            const callback = (res) => {
                // console.log(res)
                vm.tasks = JSON.parse(res).tasks
            }

            kustom.httpGET(file, callback)
        },
        screenshot() {
            el = $('#report')[0]
            html2canvas(el).then(function (canvas) {
                // document.body.appendChild(canvas)

                const link = document.createElement('a')
                link.download = 'screenshot.png'
                link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
                // link.click()

                vm.reports.push(canvas.toDataURL())

                var string = canvas.toDataURL()
                var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
                var x = window.open();
                x.document.open();
                x.document.write(iframe);
                x.document.close();
                // vm.openInNewTab(canvas.toDataURL())
            })
        },
        openInNewTab(base64ImageData2) {
            const base64ImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
            const contentType = 'image/png';

            const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, {
                type: contentType
            });
            const blobUrl = URL.createObjectURL(blob);

            window.open(blobUrl, '_blank');
        }
    },
    mounted: function () {
        this.getSavedData('saved.json')
    }
})