#!/bin/bash

# Delete old daily backups (older than 7 days)
git for-each-ref --format='%(refname:short)' refs/remotes/origin/backup/daily/* | \
  while read -r branch; do
    branch_date=$(echo "$branch" | cut -d '/' -f 4)
    if [[ $(date -d "$branch_date" +%s) -lt $(date -d "7 days ago" +%s) ]]; then
      git push origin --delete "$branch"
    fi
  done

# Delete old weekly backups (older than 4 weeks)
git for-each-ref --format='%(refname:short)' refs/remotes/origin/backup/weekly/* | \
  while read -r branch; do
    branch_week=$(echo "$branch" | cut -d '/' -f 4)
    if [[ $(date -d "$branch_week" +%s) -lt $(date -d "4 weeks ago" +%s) ]]; then
      git push origin --delete "$branch"
    fi
  done

# Delete old monthly backups (older than 12 months)
git for-each-ref --format='%(refname:short)' refs/remotes/origin/backup/monthly/* | \
  while read -r branch; do
    branch_month=$(echo "$branch" | cut -d '/' -f 4)
    if [[ $(date -d "$branch_month" +%s) -lt $(date -d "12 months ago" +%s) ]]; then
      git push origin --delete "$branch"
    fi
  done
