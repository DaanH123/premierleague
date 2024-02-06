async function fetchData() {
    const tableBody = document.querySelector('tbody');

    const url = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=39';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7d2f9c06cemshc40868bc513310fp1e7d43jsn297be756d16b',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const standings = result.response[0].league.standings[0];

        standings.forEach(element => {
            const place = element.rank;
            const teamName = element.team.name;
            const teamLogo = element.team.logo;
            const teamPosition = element.rank;
            const teamPoints = element.points;
            const playedGames = element.all.played;

            const matchesWon = element.all.win;
            const matchesDrawn = element.all.draw;
            const matchesLost = element.all.lose;

            const goalsFor = element.all.goals.for;
            const goalsAgainst = element.all.goals.against;

            const matchWOrL = element.form.split('');

            const matchResults = matchWOrL.map(match => {
                const winOrLose = match === 'W' ? 'bg-green-500' : 'bg-red-500';
                return `<span class="inline-block w-4 h-4 mr-1 rounded-full ${winOrLose}"></span>`;
            }).join('');

            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                    <p class="flex items-center">${place}<img class="w-8 h-8 mx-2" src="${teamLogo}" alt="${teamName}"> ${teamName}</p>
                </th>
                <td class="px-6 py-4">${playedGames}</td>
                <td class="px-6 py-4">${matchesWon}</td>
                <td class="px-6 py-4">${matchesDrawn}</td>
                <td class="px-6 py-4">${matchesLost}</td>
                <td class="px-6 py-4">${goalsFor}</td>
                <td class="px-6 py-4">${goalsAgainst}</td>
                <td class="px-6 py-4">${goalsFor - goalsAgainst}</td>
                <td class="px-6 py-4">${teamPoints}</td>
                <td class="px-6 py-4">${matchResults}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}