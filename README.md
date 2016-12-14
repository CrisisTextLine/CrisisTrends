# Quickstart

1. Clone this repository
1. `npm install -g gulp`
1. `npm install`
1. `gulp serve`
1. Start coding!

More instructions located in [installation docs](docs/install.md)

# Updating FAQs

Remember to code in escaped HTML. This means escaping \" quotes \" and using &lt;br&gt; instead of 
pressing enter. There should be one question and answer per line.

## Adding a section:

```json
{
  "Section title": {
    "image": "images/icon.png",
    "questions": {
    }
  }
}
```

## Adding a subsection:

```json
{
  "questions": {
    "Subsection title": {
      "question": "answer"
    }
  }
}
```

## Adding a question directly

```json
{
  "questions": {
    "question": "answer"
  }
}

## Subsections and questions can be mixed together

```json
{
  "questions": {
    "question": "answer",
    "subsection" {
      "question": "answer"
    }
  }
}
```
