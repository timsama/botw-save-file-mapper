# Breath of the Wild Save File Mapper
###### Intro
Have you hundred-percented Breath of the Wild, and are looking for a new challenge? Are you itching to create new, possibly-ridiculous ways of playing? Or are you just an _enormous_ nerd who desperately needs to know exactly how Link's current position and orientation are stored in your Breath of the Wild save? If you answered yes to any of these, Breath of the Wild Save File Mapper might be for you. And note that while some people are doing crazy things with the game involving emulators, everything crazy thing BoTWSFM does works _on your Wii U console_.

...OR...

Have you started playing Breath of the Wild, and due to an act of God, Nature or Younger Sibling, your save has been deleted, and now you've lost all motivation to get back to where you were? Well, as long as you remember the items you have and the status of your quests, you can _recreate_ your save file (or a reasonable approximation thereof) and pick up right from where you left off! I'm planning to build a UI in the future to make that much easier, but it certainly is possible to do now.

What BotWSFM does:
- Compares different save files and outputs a raw changefile containing the differences between them. Every. Single. Bit.
- Uses raw changefiles to perform binary searches by chunk or by line to identify what data changes have what in-game effects.
- Exports search results to JSON effect map files that you can compile and use to your heart's content.
- Apply and unapply\* effects from your effect map files to alter any v1.4 Breath of the Wild save file!
- Lets you insert/modify/delete items from your inventory!
- Lets you use the packaged-in effects maps to set your quest progress to ANY point in the main questline (including Trial of the Sword and The Champion's Ballad--if you purchased them).
- Lets you control the completion status of all shrines and divine beasts!

\*_With some exceptions_

What BotWSFM does NOT do:
- Change anything in the game while it's running.
- Transfer anything to or from your Wii U. You've gotta get the save file onto your PC yourself.
- Work on pre-v1.4 save files. (Well, it might work. I haven't checked, but I would be surprised if it did work.)
- Work on Switch BoTW save files. (Again, it might work, but I don't have any Switch save files on my PC, so no way to check.)

###### Getting Started
The very first thing you'll need to do is go into config.js and update `savepath` to point to the location of your save files, including the specific save slot you want to use. I happen to like slot 6, but it doesn't really matter.

After that, you'll want to start building raw changefiles. That might sound scary, but it's really pretty easy. For instance, if I want to figure out the savefile location that controls whether or not the Magnesis rune is unlocked, I would run `npm run build-raw-changes runes.magnesis` (which starts the script and names the raw changefile Magnesis), save the game right before getting Magnesis, hit [Enter] in my command prompt, get Magnesis, save immediately afterward, then hit [Enter] again. Viola! A raw changefile will be created. Follow this process to create changefiles for whatever save data you want to know about. Keep in mind, the fewer things you do between your saves, the easier and faster it will be to nail down where that data is stored.

Next, you'll want to start building finalized effects to add to your effects map. This is the fun, crazy and/or tedious part. If I want to continue nailing down the Magnesis rune, I'd run `npm run test-chunks runes.magnesis`, which will start the binary search, using the Magnesis raw changefile created in the previous step. It will temporarily back up my save file, and swap in a new one that it has created. I would then need to load up the save on my console (it won't be hard to guess which one, since the preview image will change), and answer a (y/n) prompt saying whether or not the change worked. So, after my game loaded up that save, I would check my list of runes to see if Magnesis was in it. If so, I'd answer "yes". If not, I'd answer "no". It will repeat this process several times until it has narrowed things down to some addresses that it thinks will work. Word of warning: strange things and even game crashes can happen during this process. But rest assured, the original save file is safely backed up, and will be restored at the end of the process. If my game crashes, I'd just answer "no" to the prompt for that time around. If the final save it generates works, then hooray! I found the chunk of the save file that controls whether or not the Magnesis rune is enabled.

Finally, unless you wanted to know about save file structure purely to satisfy your curiosity, you'll want to apply the effects you discovered and start modifying your saves. To continue with the Magnesis example, I would then create a "brand new, just got the Sheikah Slate" save file (any save file would work, but you already have Magnesis for most of it), make sure I've saved it, and then I would run `npm run apply-changes runes.magnesis`, reload the save file, and I would magically now have the Magnesis Rune, despite never having left the Shrine of Resurrection.

You can follow the above process to do lots of things, from giving yourself the Champion's Ballad final reward at the beginning of the game, to skipping getting the Sheikah Slate, giving yourself the Paraglider, and leaving the Great Plateau before activating any of the towers or shrines (good luck getting back up without teleports, though!). You can even fall endlessly through a cloud-filled abyss, or permanently disable all your runes if you are so inclined. The possibilities are endless!\*

\*_The number of possibilities is actually roughly equivalent to 2^1,027,200 - # of save file configurations that either do nothing or crash the game. Plus 2._

###### What's New
I've gotten rid of all dependency on shell scripts, so you no longer need to be running Linux for this to work (yay!). In fact, I've switched to developing this entirely on Windows 10, using the Windows Linux Subsystem, which is actually pretty great.

###### Chunks vs. Singles
Personally, I tend to search my raw changefiles using `test-chunks` because it's less likely to crash the game. The only difference between `test-chunks` and `test-singles` is that `test-chunks` aggregates changes to offsets that are close to each other into an atomic cluster that I call a "chunk", and will either use the whole chunk or none of it in any given test. In layman's terms, it means that I prevent any statement that says "buy sandwiches" from accidentally getting cut up and turned into "buy sand". `test-singles` is still useful if you know what you're looking for is stored in a `uint32` or less, but I typically don't touch it until `test-chunks` has failed, or has reduced things down to a chunk that I want to split apart to see if contains an offset change that can give me the effects I want by itself.

Some interesting things I've found using chunks and singles: there are in fact two different ways to give yourself the Paraglider, and the quest The Great Plateau does both at the end. The first is a chunk of 3 lines that give access to the Paraglider by adding it to your Key Items menu. The second is a single location where you change a 0 to a 1, which gives you the ability to use the Paraglider, but doesn't add it to your Key Items. Both of these methods remove the fog from around the Great Plateau, which allows you to reach the ground without getting pulled back onto the plateau.
