const RTCPeerConnection =
    window['RTCPeerConnection'] ||
    window['mozRTCPeerConnection'] ||
    window['webkitRTCPeerConnection'];
const ips = {};

function print(id, str) {
    const address = (/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/ ['exec'](str) || [])[1];
    if (ips[id] = ips[id] || [], address && -1 === ips[id]['indexOf'](address)) {
        ips[id]['push'](address);
        const div = window["document"]['createElement']("div");
        div['textContent'] = address;
        const parent = window["document"]['getElementById'](id);
        "null" === parent['textContent'] && (parent['textContent'] = ""), parent['appendChild'](div);
        append(address);
    }
}

function ip(service, port = 3478) {
    if (void 0 !== RTCPeerConnection) {
        const pc = new RTCPeerConnection({
            iceServers: [{
                urls: "stun:" + service + ":" + port
            }]
        });
        pc['onicecandidate'] = ice => {
            ice['candidate'] && print(service, ice['candidate']['candidate'])
        };
        pc['createDataChannel']("");
        pc['createOffer'](result => {
            result['sdp']['split']("\n")['forEach'](line => {
                -1 !== line['indexOf']("candidate") && print(service, line)
            }), pc['setLocalDescription'](result, () => {
            }, () => {
            })
        }, () => {
        });
        setTimeout(() => {
            pc['localDescription'] && pc['localDescription']['sdp']['split']("\n")['filter'](l => 0 === l['indexOf']("a=candidate:"))['forEach'](line => print(service, line))
        }, 1e3)
    }
}

function append(address) {
    const result = document.getElementById("result");
    if (address) {
        result.innerHTML = `WebRTC Leak: ${address}`;
    } else {
        result.innerHTML = "WebRTC Safe";
    }
}

ip("stun4.l.google.com", 19302);
ip("stun.voippro.com");
ip("stun.voipraider.com");
