#!/bin/bash

handle_error() {
    echo "Error: Command failed: $1"
    exit 1
}

run_command() {
    echo "$2"
    eval "$1" || handle_error "$1"
}


run_command "sudo -i" "Switching to superuser..."
run_command "cd /opt/NullAway-Sandbox/"
run_command "git pull origin main" "Pulling the latest changes from the main branch..."
run_command "cd /opt/NullAway-Sandbox/ui/frontend"
run_command "yarn build" "Building the frontend with Yarn..."
run_command "cd /opt/NullAway-Sandbox/ui"
run_command "cargo build --release" "Building the UI with Cargo in release mode..."
run_command "cd /opt/NullAway-Sandbox/compiler"
run_command "./build.sh" "Executing the compiler build script..."
run_command "sudo systemctl restart nullaway-ui.service" "Restarting the nullaway-ui service..."

SERVICE_STATUS=$(sudo systemctl is-active nullaway-ui.service)

if [ "$SERVICE_STATUS" == "active" ]; then
    echo "Service restarted successfully."
else
    echo "Service failed to restart."
    exit 1
fi

