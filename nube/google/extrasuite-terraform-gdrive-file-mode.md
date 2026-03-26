https://github.com/think41/extrasuite

AI agents that safely read and edit your Google Workspace files — with a full audit trail.

ExtraSuite is terraform for google drive files. You can pull a google drive file (sheets/docs/forms/app scripts/slide), edit the files locally and push it back. Extrasuite will figure out what you changed, then create the right API calls to update the google drive file.

I have been working on extrasuite (https://github.com/think41/extrasuite). This is like terraform, but for google drive files.
It provides a git like pull/push workflow to edit sheets/docs/slides. `pull` converts the google file into a local folder with agent friendly files. For example, a google sheet becomes a folder with a .tsv, a formula.json and so on. The agent simply edits these files and `push`es the changes. Similarly, a google doc becomes an XML file that is pure content. The agent edits it and calls push - the tool figures out the right batchUpdate API calls to bring the document in sync.

None of the existing tools allow you to edit documents. Invoking batchUpdate directly is error prone and token inefficient. Extrasuite solves these issues.

In addition, Extrasuite also uses a unique service token that is 1:1 mapped to the user. This means that edits show up as "Alice's agent" in google drive version history. This is secure - agents can only access the specific files or folders you explicitly share with the agent.
