# D&D Portraits OBS Embbed
These scripts are used to create [Browser Sources](https://obsproject.com/wiki/Sources-Guide#browser-source) for the [OBS](https://obsproject.com/) streaming and recording software that contain small character portraits that track the hitpoints of a D&D character using [D&D Beyond](https://www.dndbeyond.com/). 

## Usage
There are three steps for getting the character portraits to work:

1. Create a folder in the root directory of this project called `character-portraits`. Add character portraits for all your characters to there, and renamed to be all lowercase and with `-` instead of spaces, like so: `Caleb Widogast` -> `caleb-widogast.png`. The file extension can be any image format supported by the chromium browser.

2. Run the server using the command `python3 main.py`. **Do not** close this window for the browser sources to work.

3. For every character, add a new browser source to your OBS scene with the following URL: `http://127.0.0.1:5000/portrait?name=your-character's-name&id='your-character's-id`, replacing `your character's name` with the name of your character as used in step 1 and `your character's id` with the character ID from D&D Beyond*.


\* You can find out a character ID by navigating to its character sheet in D&D Beyond and checking the last number in the URL. For example, from the following URL: https://www.dndbeyond.com/characters/12341234 you'd extract the ID `12341234`.

## Examples
Here is an example of how your scene might look: 

![Example 1](https://i.imgur.com/2d9spNi.png)

The health bars should automatically update when damage is taken/healed in D&D Beyond, with a delay of around 5 seconds.
