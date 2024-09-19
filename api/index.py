import spacy
from flask import Flask, request, jsonify
from collections import Counter

app = Flask(__name__)
nlp = spacy.load('en_core_web_sm')


def extract_keywords(job_description, min_frequency=2, max_keywords=20):
    """
    Extracts important keywords from a job description.
    """
    doc = nlp(job_description)

    potential_keywords = [
        token.lemma_.lower() for token in doc
        if (token.pos_ in ['NOUN', 'PROPN'] or token.ent_type_)
        and len(token.text) > 2
        and not token.is_stop
    ]

    keyword_freq = Counter(potential_keywords)

    important_keywords = [
        keyword for keyword, freq in keyword_freq.most_common(max_keywords)
        if freq >= min_frequency
    ]

    return important_keywords


def update_cv(cv_data, job_keywords):
    """
    Modifies a CV by adding job description keywords to the skills section.
    """
    for skill_category in cv_data['skills']:
        for job_keyword in job_keywords:
            if job_keyword not in skill_category['skills']:
                skill_category['skills'].append(job_keyword)
    return cv_data


@app.route("/api/python", methods=['POST'])
def process_cv_update():
    """
    Handles POST requests to update a CV based on job description keywords.
    """
    data = request.json
    cv_data = data.get('cv')
    job_description = data.get('job_description')

    if not cv_data or not job_description:
        return jsonify({"error": "CV data or job description not provided"}), 400

    job_keywords = extract_keywords(job_description)
    modified_cv_json = update_cv(cv_data, job_keywords)

    return jsonify({"updated": modified_cv_json})
