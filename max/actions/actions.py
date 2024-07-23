import pandas as pd
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionGetContactInfo(Action):

    def name(self) -> Text:
        return "action_get_contact_info"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        df = pd.read_csv('resume.csv')
        name = next(tracker.get_latest_entity_values("name"), None)

        if name:
            contact_info = df[df['name'].str.lower() == name.lower()].dropna().to_dict('records')
            if contact_info:
                detail = contact_info[0]
                latest_intent = tracker.latest_message['intent'].get('name')

                if latest_intent == "ask_phone":
                    message = f"{detail['phone']}"
                elif latest_intent == "ask_email":
                    message = f"{detail['email']}"
                else:
                    message = f"I don't have contact information for {name}."
            else:
                message = f"I don't have contact information for {name}."
        else:
            message = "I didn't catch the name. Could you please repeat it?"

        dispatcher.utter_message(text=message)
        return []

class ActionGetPersonalDetails(Action):

    def name(self) -> Text:
        return "action_get_personal_details"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        df = pd.read_csv('resume.csv')
        name = next(tracker.get_latest_entity_values("name"), None)

        if name:
            personal_details = df[df['name'].str.lower() == name.lower()].dropna().to_dict('records')
            if personal_details:
                detail = personal_details[0]
                latest_intent = tracker.latest_message['intent'].get('name')

                if latest_intent == "ask_birth_date":
                    message = f"{detail['birth_date']}"
                elif latest_intent == "ask_summary":
                    message = f"{detail['summary']}"
                elif latest_intent == "ask_hobbies":
                    message = f"{detail['hobbies']}"
                else:
                    message = f"Birth Date: {detail['birth_date']}, Summary: {detail['summary']}, Hobbies: {detail['hobbies']}"
            else:
                message = f"I don't have personal details for {name}."
        else:
            message = "I didn't catch the name. Could you please repeat it?"

        dispatcher.utter_message(text=message)
        return []
        
class ActionGetJobDetails(Action):

    def name(self) -> Text:
        return "action_get_job_details"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        df = pd.read_csv('resume.csv')
        name = next(tracker.get_latest_entity_values("name"), None)
        
        # Normalize the name
        if name and name.lower() == "number 2":
            name = "Matt"

        if name:
            job_details = df[df['name'].str.lower() == name.lower()].dropna().to_dict('records')
            if job_details:
                detail = job_details[0]
                latest_intent = tracker.latest_message['intent'].get('name')

                if latest_intent == "ask_company":
                    message = f"{name} works at {detail['company']}."
                elif latest_intent == "ask_job_title":
                    message = f"{name}'s job title is {detail['job_title']}."
                elif latest_intent == "ask_skills":
                    message = f"{name}'s skills are {detail['skills']}."
                elif latest_intent == "ask_projects":
                    message = f"{name}'s current projects are a {detail['projects']}."
                else:
                    message = f"Company: {detail['company']}, Job Title: {detail['job_title']}, Skills: {detail['skills']}, Projects: {detail['projects']}"
            else:
                message = f"I don't have job details for {name}."
        else:
            message = "I didn't catch the name. Could you please repeat it?"

        dispatcher.utter_message(text=message)
        return []

class ActionGetEducationDetails(Action):

    def name(self) -> Text:
        return "action_get_education_details"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        df = pd.read_csv('resume.csv')
        name = next(tracker.get_latest_entity_values("name"), None)

        if name:
            education_details = df[df['name'].str.lower() == name.lower()].dropna().to_dict('records')
            if education_details:
                detail = education_details[0]
                latest_intent = tracker.latest_message['intent'].get('name')

                if latest_intent == "ask_college":
                    message = f"{name} went to {detail['college']}."
                elif latest_intent == "ask_degree":
                    message = f"{name} earned a {detail['degree']}."
                elif latest_intent == "ask_major":
                    message = f"{name} majored in {detail['major']}."
                elif latest_intent == "ask_certifications":
                    message = f"{name} earned certifications in {detail['certifications']}."
                else:
                    message = f"College: {detail['college']}, Degree: {detail['degree']}, Major: {detail['major']}, Certifications: {detail['certifications']}"
            else:
                message = f"I don't have education details for {name}."
        else:
            message = "I didn't catch the name. Could you please repeat it?"

        dispatcher.utter_message(text=message)
        return []