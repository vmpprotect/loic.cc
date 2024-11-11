document.addEventListener('DOMContentLoaded', () => {
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('music');

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#0055ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0055ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'bounce',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                }
            },
            modes: {
                grab: {
                    distance: 250,
                    line_linked: {
                        opacity: 0.5,
                        color: '#0055ff'
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    let mouseDown = false;
    let lastSpawn = Date.now();
    const spawnCooldown = 100;
    const maxParticles = 50;

    document.addEventListener('mousedown', () => mouseDown = true);
    document.addEventListener('mouseup', () => mouseDown = false);
    document.addEventListener('mousemove', (e) => {
        if (mouseDown && Date.now() - lastSpawn > spawnCooldown) {
            const particles = pJSDom[0].pJS.particles;
            
            if (particles.array.length < maxParticles) {
                particles.array.push(
                    ...Array(2).fill().map(() => ({
                        x: e.clientX,
                        y: e.clientY,
                        color: '#0055ff',
                        size: Math.random() * 3 + 2,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2
                    }))
                );
                
                lastSpawn = Date.now();
            }
        }
    });

    landing.addEventListener('click', () => {
        landing.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in');
        music.play();
    });

    const DISCORD_ID = '1288998313160609876'; // vmp's ONLY discord id.

    async function updateDiscordPresence() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const data = await response.json();
            const { data: presence } = data;

            updatePresenceUI(presence);
        } catch (error) {
            console.error('Failed to update Discord presence:', error);
        }
    }

    setInterval(updateDiscordPresence, 5000);
    updateDiscordPresence();

    function updatePresenceUI(presence) {
        document.querySelector('.discord-avatar').src = `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.png?size=512`;
        document.querySelector('.discord-name').textContent = presence.discord_user.display_name;
        
        const statusColors = {
            online: '#43b581',
            idle: '#faa61a',
            dnd: '#f04747',
            offline: '#747f8d'
        };
        document.querySelector('.discord-status').style.background = statusColors[presence.discord_status];

        const activityDiv = document.querySelector('.discord-activity');
        if (presence.listening_to_spotify && presence.spotify) {
            activityDiv.innerHTML = `
                <i class="fab fa-spotify"></i>
                <span>Listening to Spotify</span>
                <div class="song-info">${presence.spotify.song}</div>
                <div class="song-info">${presence.spotify.artist}</div>
                <div class="song-info">${presence.spotify.album}</div>
            `;
        } else if (presence.activities && presence.activities.length > 0) {
            const activity = presence.activities.find(act => act.name !== "Custom Status") || presence.activities[0];
            activityDiv.innerHTML = `
                <i class="fas fa-gamepad"></i>
                <span>${activity.name}</span>
                <div class="song-info">${activity.details || ''}</div>
            `;
        } else {
            activityDiv.innerHTML = `
                <i class="fas fa-circle"></i>
                <span>${presence.discord_status.toUpperCase()}</span>
            `;
        }
    }
}); 