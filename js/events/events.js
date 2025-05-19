let events = document.querySelectorAll('.event-img');
let eventPhoto = [
    './images/events/horse.png',
    './images/events/tableTennis.png',
    './images/events/jazzMusic.png',
    './images/events/desserts.png',
    './images/events/volleyball.png',
    './images/events/narodArtists.png',
    './images/events/fishing.png',
    './images/events/basketball.png',
    './images/events/StandUp.png',
    './images/events/forestMassive.png',
    './images/events/golf.png',
    './images/events/focus.png',
    './images/events/cocktails.png',
    './images/events/pool.png',
    './images/events/danceSurprise.png',
    './images/events/confectionery.png',
    './images/events/football.png',
    './images/events/karaoke.png',
    './images/events/quadBikes.png',
    './images/events/bigTennis.png',
    './images/events/party.png'
];
for (let i = 0; i < events.length; i++) {
    events[i].style.backgroundImage = `url('${eventPhoto[i]}')`;
};
