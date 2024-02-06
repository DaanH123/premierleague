async function fetchData() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/players?team=47&season=2023';
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

        const players = result.response;
        
        players.forEach(player => {
            const name = player.player.name;
            const age = player.player.age;
            const position = player.statistics[0].games.position;

            let totalGoals = 0;
            let totalAssists = 0;
            // Add other stats as needed

            player.statistics.forEach(stat => {
                if (stat.games.goals) {
                    totalGoals += stat.games.goals;
                }
                if (stat.games.assists) {
                    totalAssists += stat.games.assists;
                }
                // Add other stats as needed
            });

            console.log(`Player: ${name}, Age: ${age}, Position: ${position}, Total Goals: ${totalGoals}, Total Assists: ${totalAssists}`);
        });
    } catch (error) {
        console.error(error);
    }
}