# FROM n8nio/n8n

# USER root

# # Install JS dependencies globally so Code Node can use them
# RUN npm install -g @xenova/transformers

# # Copy exported workflows into container (they must be in n8n/workflows/)
# COPY workflows /workflows

# # Switch back to node user for running n8n
# USER node

# # Entry script: Import workflows only if DB is empty, then start n8n
# ENTRYPOINT sh -c '
#   if [ -d "/workflows" ] && [ "$(ls -A /workflows)" ]; then
#     echo "Importing workflows..."
#     for file in /workflows/*.json; do
#       n8n import:workflow --input="$file" || echo "Failed to import $file";
#     done
#   else
#     echo "No workflows found to import."
#   fi
#   exec n8n start
# '







FROM n8nio/n8n

USER root

# Install JS dependencies globally so Code Node can use them
RUN npm install -g @xenova/transformers

# (Optional) Python + spaCy if you want hybrid NLP
# RUN apt-get update && apt-get install -y python3-pip
# RUN pip install spacy && python3 -m spacy download en_core_web_sm


# # Install JS dependencies globally so Code Node can use them
# RUN npm install -g @xenova/transformers

# # (Optional) Python + spaCy if you want hybrid NLP
# # RUN apt-get update && apt-get install -y python3-pip
# # RUN pip install spacy && python3 -m spacy download en_core_web_sm



# # Go into the n8n installation folder
# WORKDIR /usr/local/lib/node_modules/n8n

# # Install @xenova/transformers locally so Code Node can require() it
# RUN npm install @xenova/transformers

# # Reset workdir back
# WORKDIR /



# # Install globally
# RUN npm install -g @xenova/transformers

# # Make global modules visible to Node.js in n8n
# ENV NODE_PATH=/usr/local/lib/node_modules
# ENV NODE_OPTIONS=--require=/usr/local/lib/node_modules

USER node
