var BASE_URL = "http://127.0.0.1:5000";
var CHARACTER_ID = 0;

var character_info = {
    max_hp: 1,
    current_hp: 1,
    temp_hp: 0
}

var animation_id = 0;
var current_animation_frame = 0;

function setup(character_id, base_url) {
    BASE_URL = base_url;
    CHARACTER_ID = character_id;
}

function smoothstep(t) {
    return t == 0 ? 0 : (t == 1 ? 1 : 3 * Math.pow(t, 2) - 2 * Math.pow(t, 3));
}

function animateHPBar(element, start, end, total_frames)
{
    let value = smoothstep(current_animation_frame / total_frames);
    value *= (end - start);
    value += start;
    value = Math.floor(value);
    current_animation_frame++;
    element.style.width = `${value}%`;

    if (current_animation_frame > total_frames) {
        clearInterval(animation_id);
        animation_id = 0;
        return;
    }
}

async function updateOverlay()
{
    if (animation_id != 0)
        return;

    const response = await fetch(`${BASE_URL}/api/character-hp/${CHARACTER_ID}`);
    if (!response.ok)
        return;
    const data = await response.json();
    if (data.error) {
        console.error(data.error);
        return;
    }

    const prev_hp_percent = Math.floor(100 * character_info.current_hp / character_info.max_hp);

    character_info.max_hp = data.max;
    character_info.temp_hp = data.temp;
    character_info.current_hp = data.current;

    const hp_percent = Math.floor(100 * character_info.current_hp / character_info.max_hp);
    const hp_bar = document.getElementById("hp-bar");

    if (prev_hp_percent != hp_percent) {
        current_animation_frame = 1;
        animation_id = setInterval(() => {animateHPBar(hp_bar, prev_hp_percent, hp_percent, 50)}, 12);
    }
}

const id = setInterval(updateOverlay, 5000);