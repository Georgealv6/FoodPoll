var pollMembers = document.querySelectorAll('.poll-member')

var members = ['Pizza', 'Burgers', 'Tacos', 'Pasta']


pollMembers.forEach((pollMember, index) => {
    pollMember.addEventListener('click', (event) => {

        handlePoll(members[index])
    }, true)
})

var handlePoll = function(member) {
    axios.post('http://localhost:5000/vote', { member }).then((r) => console.log(r))
}



var pusher = new Pusher('ce20660fbfcfd0ed0646', {
    cluster: 'us2',
    encrypted: true
});


var channel = pusher.subscribe('poll');


channel.bind('vote', function(data) {
    console.log(data)

    for (i = 0; i < (data.length - 1); i++) {
        var total = data[0].votes + data[1].votes + data[2].votes + data[3].votes
        document.getElementById(data[i].name).style.width = calculatePercentage(total, data[i].votes)
        document.getElementById(data[i].name).style.background = "#388e3c"

    }
});