import SessionCookie from './Cookie';
// import chronologyResponse from './chronologyResponse.json';

const PROXY = 'http://eclipse.fairhursts.net:3001';
const PERSON = PROXY + '/eclipse/rest/person/{id}';
const CHRONOLOGY = PERSON + '/chronologyEntry?s=[{%22eventDate!calculatedDate%22:%20%22desc%22}]&pageNumber=1&pageSize=-1';
const ADDRESSES = PERSON + '/address';
const CASENOTES = PERSON + '/caseNoteEntry';
const PROFESSIONALS = PERSON + '/personRelationship/professional?temporalStatusFilter=ALL';
const PROFESSIONALS_HEADER = 'application/vnd.olmgroup-usp.relationshipsrecording.AsymmetricPersonPersonRelationshipResult+json';

class EclipseRestService {

    constructor(id) {
        this.id = id;
        this.cookie = SessionCookie();
        this.endPoints = {
            person: this.replaceId(PERSON, id),
            chronology: this.replaceId(CHRONOLOGY, id),
            addresses: this.replaceId(ADDRESSES, id),
            caseNotes: this.replaceId(CASENOTES, id),
            professionals: this.replaceId(PROFESSIONALS, id)
        };
    }

    replaceId(url, value) {
        return this.replaceItemInUrl(url, '{id}', value);
    }

    replaceItemInUrl(url, item, value) {
        return this.replaceAll(item, value, url);
    }

    replaceAll(find, replace, fullText) {
        return fullText.replace(new RegExp(find, 'g'), replace);
    }

    getPerson() {
        return this.sendRequest(this.endPoints.person, this.mapPersonResponse);
    }

    getChronology() {
        return this.sendRequest(this.endPoints.chronology, this.mapChronologyResponse);
    }

    getAddresses() {
        return this.sendRequest(this.endPoints.addresses, this.mapAddressResponse);
    }

    getCaseNotes() {
        return this.sendRequest(this.endPoints.caseNotes, this.mapCaseNotesResponse);
    }

    getProfessionals() {
        return this.sendRequest(this.endPoints.professionals, this.mapProfessionalsResponse, PROFESSIONALS_HEADER);
    }

    sendRequest(url, handler, header) {
        let options = {
            'credentials': 'include',
            'Cookie': this.cookie
        };
        if (header) { options.headers = { 'Accept': header }; }

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    if (data.results !== undefined) {
                        resolve(handler(data.results));
                    } else {
                        resolve(this.error(data));
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

    mapPersonResponse = (results) => {
        return results.map(r => {
            return {
                name: this.getPersonr.name
            }
        });
    }

    mapChronologyResponse = (results) => {
        return results.map(r => {
            return {
                event: r.event,
                date: this.makeDate(r.eventDate.calculatedDate),
                status: r.status.toLowerCase(),
                impact: r.impact.toLowerCase()
            }
        });
    }

    mapCaseNotesResponse = (results) => {
        return results.map(r => {
            return {
                date: this.makeDate(r.eventDate.calculatedDate),
                impact: r.impact.toLowerCase(),
                note: this.cleanHtml(r.event)
            }
        });
    }

    mapAddressResponse = (results) => {
        return results.map(r => {
            return {
                type: r.type,
                address: this.makeAddress(r.location),
                postcode: r.location.postcode
            }
        });
    }

    mapProfessionalsResponse = (results) => {
        return results.map(r => {
            return {
                id: r.roleAPersonId,
                name: r.name,
                relationship: r.relationship,
                primaryWorker: r.primaryWorker,
                allocatedWorker: r.allocatedWorker,
                nok: r.nextOfKin,
                mainCarer: r.mainCarer,
                parentalResponsibility: r.parentalResponsibility
            }
        });
    }


    // let scripts = [settings.osMapUrl(), settings.gMapUrl],
    //             loadPromises = scripts.map(this.scriptLoadService.load);

    //         Promise.all(loadPromises)
    //             .then((value) => {
    //                 this.elevationService.init();
    //                 this.startMap();

    //                 this.route.searchResults$.subscribe((results) => {
    //                     this.handleSearchResults(results);
    //                 });

    //                 this.loadRoute();

    //             }, function (value) {
    //                 console.error('Script not found:', value)
    //             });

    /* Utility Functions */
    makeDate = (number) => {
        return new Date(number).toISOString();
    }

    makeAddress = (data) => {
        let address = [];
        if (data.secondaryNameOrNumber !== null) { address.push(data.secondaryNameOrNumber); }
        if (data.primaryNameOrNumber !== null) { address.push(data.primaryNameOrNumber); }
        if (data.street !== null) { address.push(data.street); }
        if (data.locality !== null) { address.push(data.locality); }
        if (data.town !== null) { address.push(data.town); }
        return address.join(', ');
    }

    cleanHtml = (html) => {
        let text = [],
            div = document.createElement('div');
        div.innerHTML = html;
        for (let node of div.childNodes) {
            let temp = (node.textContent || node.innerText || '').trim();
            if (temp.length > 0) { text.push(temp); }
        }
        return text;
    }

}

export default EclipseRestService;
