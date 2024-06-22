import xgboost as xgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import sys
import json


def predict_disease_and_tips(new_text,tips_data,data):
    # Step 1: Read the Dataset
    data = pd.read_csv(data,encoding='latin-1')
    tips_data = pd.read_csv(tips_data,encoding='latin-1')
    # Step 2: Data Preprocessing
    X = data.drop('Disease', axis=1)
    y = data['Disease']

    data = data.dropna()
    data = data.drop_duplicates()
    data = data.apply(lambda x: x.astype(str).str.lower())

    if X.select_dtypes(include=['object']).shape[1] > 0:
        X_combined_text = X.apply(lambda x: ' '.join(x.astype(str)), axis=1)
        tfidf_vectorizer = TfidfVectorizer()
        X_tfidf = tfidf_vectorizer.fit_transform(X_combined_text)
        X_tfidf = X_tfidf.toarray()
    else:
        X_tfidf = X.values

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y_encoded, test_size=0.2, random_state=42)

    model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy_score(y_test, y_pred)
    roc_auc_score(y_test, model.predict_proba(X_test), multi_class='ovr')

    new_text_features = tfidf_vectorizer.transform([new_text]).toarray()

    predicted_category = label_encoder.inverse_transform(model.predict(new_text_features))[0]

    matching_rows = tips_data.loc[tips_data['Disease'] == predicted_category, 'Tips']

    tips = matching_rows.values[0] if not matching_rows.empty else f"No tips found for '{predicted_category}'"

    result = predicted_category,{"I advive you to":tips}
#{"predicted_category": predicted_category, "tips": tips}
    return json.dumps(result)

if __name__ == "__main__":
    data_path = 'test.csv'
    tips_path = 'DiseasePrecaution.csv'

    if len(sys.argv) != 2:
        print("Usage: python script.py <text>")
        sys.exit(1)

    new_text = sys.argv[1]
    result = predict_disease_and_tips(new_text,tips_path,data_path)

    print(result)



