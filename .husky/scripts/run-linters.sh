#!/bin/sh

echo "Starting RuboCop autofix loop..."
while true; do
  bundle exec rubocop -A
  if bundle exec rubocop | grep -q "no offenses detected"; then
    echo "All RuboCop offenses fixed."
    break
  else
    echo "Another round of RuboCop fixes..."
  fi
done

echo "Running HAML Lint with auto-correct..."
bundle exec haml-lint --auto-correct . --fail-level error

echo "Running ERB Lint with auto-correct..."
bundle exec erb_lint --lint-all --autocorrect

echo "Running ESLint with auto-fix..."
npm run lint:js:fix || npm run lint:fix

echo "Running Stylelint with auto-fix..."
npm run lint:css:fix || npm run lint:fix

echo "Staging any new changes after all linters..."
git add .
