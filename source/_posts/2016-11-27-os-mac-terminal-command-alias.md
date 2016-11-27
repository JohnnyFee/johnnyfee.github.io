---
layout: "post"
title: "Speed Up Your Terminal Workflow with Command Aliases and .profile
date: "2016-11-27 13:35"
categories:
---

From [Speed Up Your Terminal Workflow with Command Aliases and .profile](https://computers.tutsplus.com/tutorials/speed-up-your-terminal-workflow-with-command-aliases-and-profile--mac-30515)

What are those mysterious ".profile" and ".bash_profile" files you've heard about? How do you go about adding something to PATH, which many applications ask you to do (but none explain how)? What are aliases and how can they help your workflow? Learn all this and much more in this article on taking deeper control of OS X.

<!--more-->

---

## Learning to Use .profile to Set Up Aliases

If you've done anything other than surf social networks and watch movies on your Mac, you know there are some mysterious things going on under the hood. Maybe you've installed an application like the Homebrew package manager that asked you to do something obscure like "Add /usr/local/sbin to your path", or maybe you've heard the word "alias command" mentioned or even had an application tell you to "add X to your profile".

> The aliases presented in this article will speed up your workflow.

Through this article, it is my intention to cover the basics of these seemingly black magic actions and to get you introduced to the wonderful world of aliases. While setting up aliases in the way described in this article will be invaluable for software developers, casual users will easily find a use for them too.

## What Are Aliases?

Aliases are shortcuts to commands. For example (and a dead simple one at that), if you use Terminal to do anything, like going into your /Users/[username]/Sites/ folder, you probably use

```
$ cd /Users/[username]/Sites
```

or

```
$ cd ~/Sites
```

Once in there, you probably need to enter a specific project, (e.g. "myProject") and you do this by typing

```
$ cd myProject
```

While typing it all out in one command, like so:

```
$ cd ~/Sites/myProject
```

is not very time consuming, it can get tedious, especially in deeply nested folders or if you need to switch folders often.

With aliases, you can do it faster.

> Aliases help you shorten long commands or command chains.

Try opening Terminal (by going to Applications -> Utilities -> Terminal) and typing

```
$ alias goto_web="cd ~/Sites"
```

Make sure that a folder called Sites exists in your home folder, and create a myProject folder inside it. Then, execute the following command in terminal:

```
$ alias goto_myP="goto_web; cd myProject"
```

Now type "goto_myP" and watch the magic happen when you hit enter. It automatically went into ~/Sites/myProject, regardless of where you were when you typed it out. The advantages are twofold:

1.  You can type goto_ and press the TAB key to get a list of possible goto aliases you have defined so far.
2.  If the root folder of your web projects ever changes (e.g. Sites to MySites), all you need to do is change the main goto_web alias, and the changes cascade to all the others that use it.

![Setting up manual aliases](https://cdn.tutsplus.com/mac/authors/legacy/Bruno%20Skvorc/2012/08/08/Screen%20Shot%202012-08-09%20at%201.41.37%20AM.png)
Setting up aliases manually

### Trouble in Paradise

There's a problem, though. As soon as we log out, the aliases we defined this way are gone. They aren't saved anywhere, and the OS wasn't told to set them up again once we log back in. So how do we handle this issue? The .profile file.

> As soon as the user logs out, the terminal-defined aliases disappear.

Let's start with the basics.

## What is .profile?

> If a file's name starts with the "." (dot) character, that file is hidden

The "." (dot) in front of certain file names means the file is "hidden." This notation is usually there for system files that should not be visible by default and would either just get in the way by being annoying or by being volatile inasmuch that their change could affect the system in an undesirable manner.

The .DS_Store files, for instance, belong in the "annoying" category and are created by the application "Finder" in every folder you open with it. If you traverse folders through the terminal using "cd folderName", the .DS_Store files will not be created. However, Finder stores some information in them that let it keep track of your file system and enhance browsing and searchability.

On a related note, the aforementioned .profile file is a hidden file. It is an optional file which tells the system which commands to run when the user whose profile file it is logs in. For example, if my username is bruno and there is a .profile file in /Users/bruno/, all of its contents will be executed during the log-in procedure.

You can see where we're going with this, can't you? We'll use the .profile file to save our alias commands from above, in order to execute them on every login so that these aliases become persistent.

> The contents of a .profile file are executed on every log-in of the owner of the file

What's the .bash_profile then? It's exactly the same, but under a different name. The unix shell you are logging into, in this case OS X, looks for etc/profile and loads it if it exists. Then it looks for ~/.bash_profile, ~/.bash_login and finally ~/.profile, and loads the first one of these it finds.

I use .profile but if you prefer or have any of the other ones, feel free to rename/merge them into one, do whatever you want with them. Their syntax is identical - just keep in mind only one is loaded, and the OS looks for them in the order mentioned above. More information about these files can be found [here](http://stefaanlippens.net/bashrc_and_others "About bashrc and others").

### Finding .profile

But if it's hidden, how do we see it? How can we edit a file we're not supposed to see? Like the great commander Hannibal would say - "we will either find a [.profile file], or make one". Ok, he said "way," but the gist is the same. These are the two most common ways of showing hidden files:

The first is to make them visible to you, but still hidden. This way is not recommended for casual users. Enter the following command into Terminal:

```
defaults write com.apple.finder AppleShowAllFiles TRUE
```

Follow this up with a Finder restart:

```
$ killall Finder
```

This told Finder to stop ignoring hidden files in the folders it opens, and then forced it to reboot and to acknowledge the new settings. If you open any folder in Finder now, you should se a .DS_Store file inside it, and maybe even some other hidden folders and files like in my own home folder below.

![Visible hidden files and folders](https://cdn.tutsplus.com/mac/authors/legacy/Bruno%20Skvorc/2012/08/08/Screen%20Shot%202012-08-09%20at%201.32.48%20AM.png)
After doing method one, you will be able to see hidden files and folders in Finder

The second method is to look only for the files you need, through the Terminal. Start terminal, and go to your home folder by typing the following:

```
$ cd ~/
```

**Tip:** You can also go to your home folder by just typing cd and following it up by a space character.

Once there, type this:

```
$ ls -a
```

This lists (ls) the contents of the folder you are in, and the _-a_ parameter we added tells it to show "all" files - including hidden ones.

![Visible hidden files while listing in terminal](https://cdn.tutsplus.com/mac/authors/legacy/Bruno%20Skvorc/2012/08/08/Screen%20Shot%202012-08-09%20at%201.37.27%20AM.png)
By using method two, hidden files and folders will be revealed in Terminal

Use any of the two methods above to find out which hidden files your home folder contains, and make sure a .profile or .bash_profile file is there. If either of them exist, great. If they aren't present, create the .profile file by using the Terminal, like so:

```
$ touch ~/.profile
```

One way or the other, we are now certain the .profile file exists. Now let's add some commands to it!

## Populating the .profile File

We first need to open the file for editing. Since it's easier to edit a file in a text editing application with an actual GUI, we won't be editing through terminal, but through TextEdit. Type the following:

```
$ open -e ~/.profile
```

Or just double click the file if you used method one for showing hidden files and pick TextEdit from the Application Selection window. The "open" command opens any file using the default application if it can figure out what that is, the _-e_ tells it to use the default text editor for the current OS, and the final part is the file we want to open.

Once the file is open, we can add the following lines:

```
alias goto_web="cd ~/Sites"
alias goto_myP="goto_web; cd myProject"

alias reload_profile=". ~/.profile"
```

Now save and quit. The first two aliases have already been explained above. As for the third - if you ever change the .profile file mid-session like we just did, it needs to be re-loaded to take effect.

You would usually do this manually by typing

```
$ source ~/.profile
```

or just

```
$ . ~/.profile
```

But we might as well make our lives easier right off the bat and define an alias for that too. However, we can't use it just yet because the .profile hasn't actually been loaded, so to prevent this catch 22 from melting our brains, execute one of the commands above (manual reload).

> If you ever change the .profile file mid-session, it needs to be re-loaded to take effect.

Once done, give it a go. Type "goto_web" and see if it works. Once you reboot or log-out and log-in again, the alias should still be alive and should still work. The "reload_profile" alias will now work as well.

That's all there is to it! You can now add your own aliases. Don't feel limited to just goto aliases either (note: they don't actually need to be called goto_*, I just call them that for grouping purposes), play around and experment with your favorite Terminal commands. Here's a part of my own file with inline comments for your convenience:

```bash
# See http://www.shellperson.net/using-sudo-with-an-alias/
alias sudo='sudo '

# This helps me edit files that my user isn't the owner of
alias edit='SUDO_EDITOR="open -FWne" sudo -e'

# The alias that takes me here - to editing these very aliases
alias edit_profile='open -e ~/.profile'

# I do a lot of web development, so I need to edit these non-owned files fairly often
alias edit_hosts='edit /etc/hosts'
alias edit_httpd='edit /etc/apache2/httpd.conf'
alias edit_php='edit /etc/php.ini'
alias edit_vhosts='edit /etc/apache2/extra/httpd-vhosts.conf'

# Some of my goto commands, including one to open the php extension folder for when I need to install custom extensions
alias goto_mw='goto_web; cd mindworks'
alias goto_web='cd ~/Sites'
alias goto_phpext='sudo open /usr/lib/php/extensions/no-debug-non-zts-20100525'

# This alias recursively destroys all .DS_Store files in the folder I am currently in
alias killDS='find . -name *.DS_Store -type f -delete'

# An alias to start my custom MySQL installation instead of the default one
alias mysql='/usr/local/mysql-5.5.25-osx10.6-x86_64/bin/mysql -u root'

# This alias reloads this file
alias reload_profile='. ~/.profile'

# Mac get stuck very often and are extremely slow and unstable on shutdowns. This forces a shutdown.
alias poweroff='sudo /sbin/shutdown -h now'

# Setting for the new UTF-8 terminal support in Lion / Mountain Lion
export LC_CTYPE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Adds all these paths to the PATH variable. The colon (:) is the path separator.
# When you need to "add something to path" you're supposed to add the path to its executable file to this list of paths, separated by a colon.
export PATH="/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/X11/bin"
```

## Conclusion

Whether your use of the Terminal is casual or heavy, the .profile file can make your life infinitely easier. Having your most used commands all in one place where you can not only see them whenever you forget some of them but also automatically load them in on every log-in can easily shave hours off a working week.

What's best, most of the commands are *nix compatible, so not only can you take the file with you to another OS X machine, you can also include it in your Linux machines if you use any. With the .profile file, the speed upgrade of your workflow is contained in a single file you can easily take with you.

Play around with it, make up some more aliases that might be useful (like show/hide hidden files with a single command - I'll let you figure that one out on your own), and give your workflow speed a level-up.
