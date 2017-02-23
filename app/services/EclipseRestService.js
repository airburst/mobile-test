// import SessionCookie from './Cookie';

const AUTH = 'http://eclipse.fairhursts.net/eclipse/rest/authenticate';
const PROXY = 'http://eclipse.fairhursts.net';
const PERSON = PROXY + '/eclipse/rest/person/{id}';
const SEARCH = PROXY + '/eclipse/rest/person?s=%5B%5D&pageNumber=1&';
const CHRONOLOGY = PERSON + '/chronologyEntry?s=[{%22eventDate!calculatedDate%22:%20%22desc%22}]&pageNumber=1&pageSize=-1';
const ADDRESSES = PERSON + '/address';
const CASENOTES = PERSON + '/caseNoteEntry';
const PROFESSIONALS = PERSON + '/personRelationship/professional?temporalStatusFilter=ALL';
const PROFESSIONALS_HEADER = 'application/vnd.olmgroup-usp.relationshipsrecording.AsymmetricPersonPersonRelationshipResult+json';

class EclipseRestService {

    constructor(id = 1) {
        this.id = id;
        // this.cookie = SessionCookie();
        this.endPoints = {
            person: this.replaceId(PERSON, id),
            search: SEARCH,
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

    search(params) {
        // params ~ e.g. { postCode: 'AB1 1AB' }
        // See Person Search Params.txt for full list
        let url = this.endPoints.search + this.flattenParams(params);
        return this.sendRequest(url, this.mapSearchResponse);
    }

    flattenParams(params) {
        return Object.entries(params).map(p => {
            return `${p[0]}=${encodeURI(p[1])}`;
        }).join('&');
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

    auth(username, password) {
        let body = {
            userName: username,
            credentials: password,
            _type: 'SecurityAuthentication'
        };
        let options = {
            'method': 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        return new Promise((resolve, reject) => {
            fetch(AUTH, options)
                .then(res => {
                    if (res.status) {
                        // let cookie = res.headers.map['set-cookie'][0];
                        // console.log(cookie);
                        resolve(res.headers);
                    } else {
                        resolve(this.error(res));
                    }
                })
                .catch(error => reject(error));
        });
    }

    sendRequest(url, handler, header) {
        let options = {};
        if (header) { options.headers = { 'Accept': header }; }
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(res => { console.log(res); return res.json(); })
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

    mapSearchResponse = (results) => {
        console.log('Search Results', results)
        return results.map(r => {
            return {
                title: r.title,
                name: r.name,
                dob: (r.dateOfBirth) ? r.dateOfBirth.calculatedDate : undefined,
                age: r.age,
                ethnicity: r.ethnicity,
                nhsNumber: r.nhsNumber
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
