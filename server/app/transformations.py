from transformers import pipeline

ner_analyzer = pipeline("ner")


class SentimentModel:
    def analyze_sentiment(self, text):

        from transformers import pipeline

        classifier = pipeline("sentiment-analysis")
        result = classifier(text)[0]
        return result["label"], result["score"]


    def extract_entities(self, text):
        entities = ner_analyzer(text)
        return [{ent["entity"]: ent["word"]} for ent in entities]
