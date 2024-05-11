from transformations import SentimentModel


class Agent:
    def __init__(self) -> None:
        pass

    def handle(self, message):
        raise NotImplementedError
    



class BookingAgent(Agent):
    def handle(self, message):
        return "Booking confirmed for " + message["date"]


class WeatherAgent(Agent):
    def handle(self, message):
        return "Weather is sunny in " + message["location"]


class SentimentAnalysisAgent(Agent):
    def handle(self, message):
        model = SentimentModel()

        sentiment, score = model.analyze_sentiment(message)

        

        if sentiment == "POSITIVE":
            response = f"Great to hear that! 😊 Your positive score is {score:.2f}. How can I assist you further?"
        elif sentiment == "NEGATIVE":
            response = f"I'm sorry to hear that. 😟 Your negative score is {score:.2f}. How can I assist you to make things better?"
        else:
            response = f"Thank you for sharing. Your neutral score is {score:.2f}. What else would you like to discuss?"

        return response, score


agents = {
    "booking": BookingAgent(),
    "weather": WeatherAgent(),
    "sentiment_analysis": SentimentAnalysisAgent(),
}
