// From https://github.com/AnonyKagamine/PositiveMessenger
// License: WTFPL
function initDataByJsonText(text) {
    var jsonobj = JSON.parse(text)
    名人名言 = jsonobj.famous
    后面垫话 = jsonobj.after
    前面垫话 = jsonobj.before
    论述 = jsonobj.bosh
}

function loadData(json_url="./data.json", sync=false)
{
    var req = new XMLHttpRequest();
    req.open('GET', json_url, sync);

    req.onload = function() {
        if (req.status == 200) {
            //console.log(req.responseText);
            initDataByJsonText(req.responseText);
            changeHeaderTitle("Complete!");
            setTimeout(function(){changeHeaderTitle(default_title)}, 3000);
        } else {
            console.log("Failed:", req.status);
        }
    };

    // Handle network errors
    req.onerror = function() {
        console.log("Network Error");
    };
    
    // Make the request
    req.send();
}

function appendBoshDataAlternative(msgdataobj) {
    var tr_entry = document.createElement("tr")
    
    var radio_element = document.createElement("input")
    radio_element.type = "radio"
    radio_element.name = "bosh_version"
    radio_element.value = msgdataobj.url
    radio_element.addEventListener("change", function(){loadData(this.value, true)})
    
    var title_td = document.createElement("td")
    title_td.appendChild(radio_element)
    title_td.appendChild(document.createTextNode(msgdataobj.title))
    tr_entry.appendChild(title_td)
    
    var provider_td = document.createElement("td")
    provider_td.innerText = msgdataobj.provider
    tr_entry.appendChild(provider_td)
    
    var desc_td = document.createElement("td")
    desc_td.innerText = msgdataobj.description
    tr_entry.appendChild(desc_td)
    
    document.getElementById("boshdata").appendChild(tr_entry)
}

function loadMDI(mdi_url="../MessengerDataIndex/index.json") {
    var req = new XMLHttpRequest()
    req.open('GET', mdi_url)
    req.onload = function() {
        if (req.status == 200) {
            var md_list = JSON.parse(req.responseText);
            for (i in md_list) {
                appendBoshDataAlternative(md_list[i]);
            }
        } else {
            console.log("Load MDI Failed:", req.status);
        }
    }
    req.send()
}

loadData();
loadMDI();
