- Are the images in part 3 are from an earlier iteration of the project?  They don't show the pen icon from the avatar image.

- The picture for part 5 includes the avatar image, which won't show until we've handled the Api
  - related note:  all these initial images show profile name and job text.   I believe most of us won't see that, unless we've
    neglected to remove superfluous text from our html

- `<body> cannot appear as a child of <div>.` error seems inevitable given the project instructions, and no mention is made of
  it.  How to fix it?  Change `body` to something else?  Or move the `class=page` to the React root and ditch that element entirely.

- Is porting PopupWithImage put in the right place?   There is no way for us to check if we've done it correctly since the cards do not appear yet.