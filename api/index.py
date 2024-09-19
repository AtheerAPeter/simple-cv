import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, request, jsonify
import string

app = Flask(__name__)

# Download necessary NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)


def preprocess_text(text):
    # Tokenize and lowercase the text
    tokens = word_tokenize(text.lower())
    # Remove punctuation and stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [
        token for token in tokens if token not in string.punctuation and token not in stop_words]
    return ' '.join(tokens)


def extract_keywords(job_description, max_keywords=20):
    """
    Extracts important keywords from a job description using TF-IDF.
    """
    # Preprocess the job description
    processed_description = preprocess_text(job_description)

    # Create a TF-IDF vectorizer
    vectorizer = TfidfVectorizer(max_features=max_keywords)

    # Fit and transform the job description
    tfidf_matrix = vectorizer.fit_transform([processed_description])

    # Get feature names (words) and their TF-IDF scores
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray()[0]

    # Sort words by TF-IDF score and get the top 'max_keywords'
    keywords = sorted(zip(feature_names, tfidf_scores),
                      key=lambda x: x[1], reverse=True)[:max_keywords]

    return [word for word, score in keywords]


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
