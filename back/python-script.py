import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import sys

def train_model(new_text):
    # Step 1: Read the Dataset
    data = pd.read_csv('C:\\WPy64-31220\\notebooks\\data\\Ai\\Symptom2Disease.csv', encoding='latin-1')

    # Step 2: Data Preprocessing
    # Assuming 'label' is the column with disease labels, and the rest are features (symptoms)

    # Separate features and target variable
    X = data.drop('label', axis=1)
    y = data['label']

    # If there are text features, convert them to numerical values
    # Assuming all features are text descriptions
    if X.select_dtypes(include=['object']).shape[1] > 0:
        # Combine text features into a single feature (if you have multiple text columns, concatenate them)
        X_combined_text = X.apply(lambda x: ' '.join(x.astype(str)), axis=1)

        # Convert text data to numerical features using TF-IDF
        tfidf_vectorizer = TfidfVectorizer()
        X_tfidf = tfidf_vectorizer.fit_transform(X_combined_text)

        # Convert the sparse matrix to a dense matrix (optional, depends on the classifier you use)
        X_tfidf = X_tfidf.toarray()
    else:
        # If there are no text features, proceed with the numerical data
        X_tfidf = X.values

    # Encode the target variable if it's categorical
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y_encoded, test_size=0.2, random_state=42)

    # Step 3: Initialize and Train the Model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Step 4: Make Predictions and Evaluate the Model
    y_pred = model.predict(X_test)
    accuracy_score(y_test, y_pred)
    roc_auc_score(y_test, model.predict_proba(X_test), multi_class='ovr')

    # Preprocess the new text to match the format used during training
    new_text_features = tfidf_vectorizer.transform([new_text]).toarray()

    # Use the model to predict the category of the input text
    predicted_category = label_encoder.inverse_transform(model.predict(new_text_features))[0]

    return predicted_category



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <text>")
        sys.exit(1)

    input_symptom = sys.argv[1]
    result = train_model(input_symptom)
    print(result)