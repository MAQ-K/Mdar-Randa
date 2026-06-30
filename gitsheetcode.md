98% of storage used … If you run out, you can't create, edit, and upload files. Share 100 GB of storage with your family members for EGP 14.90 for 3 months EGP 59.99.
1
100%
# Albouyz Team Git Workflow

## First Time Setup (One Time Only)

Configure your Git identity:

``` bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Clone the repository:

``` bash
git clone https://github.com/Katechs-Dev-Team/Albouyz.git
cd Albouyz
code .
```

------------------------------------------------------------------------

# Daily Workflow (Every Time You Work)

## 1. Get the latest version

``` bash
git pull origin main
```

If Git says **Already up to date**, continue.

## 2. Make your changes

Edit HTML, CSS, JS, images, etc.

## 3. Check changed files (Optional)

``` bash
git status
```

## 4. Stage all changes

``` bash
git add .
```

## 5. Commit your work

``` bash
git commit -m "Describe your changes"
```

Examples:

``` bash
git commit -m "Update services section"
git commit -m "Fix navbar"
git commit -m "Add contact page"
```

## 6. Push to GitHub

``` bash
git push origin main
```

------------------------------------------------------------------------

# If Push Is Rejected

If you see:

    Updates were rejected because the remote contains work that you do not have locally.

Run:

``` bash
git pull origin main
```

If there are merge conflicts: 1. Resolve the conflicts. 2. Save the
files. 3. Then run:

``` bash
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

------------------------------------------------------------------------

# Don't Upload

Never commit:

-   \*.rar
-   \*.zip
-   \*.7z
-   Large backup files

Upload the actual folders instead:

-   assets/
-   css/
-   js/
-   images/

------------------------------------------------------------------------

# Quick Cheat Sheet

``` bash
git pull origin main

# Make your changes

git add .
git commit -m "Describe your changes"
git push origin main
```

------------------------------------------------------------------------

# Team Rules
git pull origin main
1.  Always run `git pull origin main` before starting work.
2.  Commit your own changes before pulling if you've already edited
    files.
3.  Use clear commit messages.
4.  Never use `git push --force` on `main` unless everyone agrees.
5.  Do not upload compressed archives to the repository.