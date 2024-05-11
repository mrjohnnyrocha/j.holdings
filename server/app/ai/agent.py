from transformations import SentimentModel


class Agent:
    def __init__(self) -> None:
        pass

    def handle(self, message):
        raise NotImplementedError
    
    def delegate_request(self, request):
        # Enhanced delegation logic
        raise NotImplementedError
    

class OutputAgent(Agent):
    def handle(self, message):
        return message
    


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

class ContextManagerAgent:
    def __init__(self, lang_graph):
        self.lang_graph = lang_graph

    def handle_request(self, request):
        """Handle requests to manage context based on the type specified in the request."""
        user_id = request.get('user_id')
        if request['type'] == 'update':
            context_data = request.get('data', {})
            self.lang_graph.update_context(user_id, context_data)
            return "Context updated"
        elif request['type'] == 'retrieve':
            return self.lang_graph.retrieve_context(user_id)
        elif request['type'] == 'analyze':
            return self.lang_graph.analyze_context(user_id)
        else:
            return "Unsupported request type"

agents = {
    "booking": BookingAgent(),
    "weather": WeatherAgent(),
    "sentiment_analysis": SentimentAnalysisAgent(),
    #"context_manager": ContextManagerAgent()
}
