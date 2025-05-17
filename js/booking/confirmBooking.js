function getUrlParameter(name) {
    name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const cottageType = getUrlParameter('type');

function setupCottageTypeInput() {
    
    const typeInput = document.getElementById('type');
    
    if (typeInput) {
        if (cottageType) {
            typeInput.value = cottageType;
        }
    }
}

document.addEventListener('DOMContentLoaded', setupCottageTypeInput);