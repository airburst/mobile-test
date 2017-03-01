const URI = 'http://api.postcodes.io/postcodes?lon={lon}&lat={lat}';

class PostcodeService {

    getPostcode(lat, lon) {
        return this.sendRequest(this.updateUrl(lat, lon), this.mapPostcodeResponse);
    }

    updateUrl(lat, lon) {
        return URI.replace('{lon}', lon).replace('{lat}', lat);
    }

    sendRequest(url, handler, header) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.result) {
                        resolve(handler(data.result));
                    } else {
                        reject(this.error(data));
                    }
                })
                .catch(error => reject(error));
        });
    }

    error = (data) => {
        return {
            error: {
                status: data.status,
                text: data.statusText
            }
        };
    }

    mapPostcodeResponse = (results) => {
        let postcodes = results.map(r => {
            return {
                postcode: r.postcode,
                distance: r.distance
            }
        });
        let sorted = this.sortChatData(postcodes);
        return sorted[0].postcode;
    }

    sortChatData (data) {
        const closest = (a, b) => {
            if (a.distance < b.distance) { return -1; }
            if (a.distance > b.distance) { return 1; }
            return 0;
        }
        return Object.values(data).sort(closest);
    }

}

export default PostcodeService;
