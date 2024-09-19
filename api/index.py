from flask import Flask, request, jsonify
from collections import Counter
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import pos_tag
from string import punctuation

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__)


def extract_keywords(job_description, min_frequency=2, max_keywords=20):
    """
    Extracts important keywords from a job description using nltk.
    """
    tokens = word_tokenize(job_description.lower())

    # Filter out stopwords and punctuation
    stop_words = set(stopwords.words('english'))
    keywords = [
        word for word in tokens
        if word not in stop_words and word not in punctuation and len(word) > 2
    ]

    # Tag tokens with part of speech
    pos_tags = pos_tag(keywords)

    # Select nouns and proper nouns
    potential_keywords = [word for word,
                          pos in pos_tags if pos in ['NN', 'NNP']]

    # Count keyword frequency
    keyword_freq = Counter(potential_keywords)

    # Select the most common keywords
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


# Vercel requires a module named 'app' to be present
app = app
