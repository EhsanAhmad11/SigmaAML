from flask import Flask, render_template, request, redirect, url_for, flash,session,jsonify
from flask_mysqldb import MySQL



app = Flask(__name__)
app.secret_key = 'secret_key'


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'sigma'

mysql=MySQL(app)

# global dict for client data
client_data={"regname":"","prevname":"","tradname":"","regadd":"","incdate":"","inccountry":"",
             "entity":"","listed":"","COR":"","COL":"","free_float":"","industry":"","ShareType":""}
sanctionDetail={"entityName":"","relatedEntity":"null","BenOwner":"","Director":""}
beneficials={}
legal_entity_data=[]
individual_data=[]

PER_PAGE=2




@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method=='POST':
        email=request.form['email']
        password=request.form['pass']
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM userinfo WHERE email=%s AND password=%s", (email, password))
        mysql.connection.commit()
        account=cur.fetchone()
        # print(account)
        if account and account[1]==email and account[2]==password:
           
            session['user_email']=account[1]
            print(session['user_email'])
            session['user_pass']=account[2]
            print(session['user_pass'])
            print(session)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
            return render_template('index.html')
        
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    print("in dashboard")

    if "user_email" in session :
        return render_template('dashboared.html')
    else:
        return redirect('/')
    
@app.route('/logout')
def logout():
    # remove user data from session
    session.pop('user_email', None)
    session.pop('user_pass', None)
    return redirect('/')

@app.route('/NewClient', methods=['GET',"POST"])
def NewClient():
    if request.method == 'POST':
        print('in post')
        print('in if')
        redirect('/client2')
    return render_template('NewClient.html')

@app.route('/ClientData', methods=['GET','POST'])
def ClientData():
    print("in client data")
    data=request.get_json()
    client_data['regname']=data['regname']
    sanctionDetail['entityName']=data['regname']
    client_data['prevname']=data['prevname']
    client_data['tradname']=data['tradname']
    client_data['regadd']=data['regadd']
    client_data['incdate']=data['incdate']
    client_data['inccountry']=data['inccountry']

    print(client_data.values())
    return "added"

@app.route('/Entity', methods=['GET','POST'])
def Entity():
    data=request.get_json()
    client_data['entity']=data['entity']
    client_data['listed']=data['listed']
    client_data['COR']=data['cor']
    client_data['COL']=data['listedc']
    client_data['free_float']=data['freeFloat']
    client_data['industry']=data['industry']
    client_data['ShareType']=data['share']

    
    print(client_data.values())
    return "success"

@app.route('/operation', methods=['GET', 'POST'])
def operation():
    data=request.get_json()
    for dict in data['names']:
  # Loop over each key-value pair in the dictionary
        for key, value in dict.items():
            # Print the key-value pair
            print(key, ":", value)

    return "success"

@app.route('/Beneficial',methods=['GET','POST'])
def Beneficial():
    print("in benowner")
    beneficials.clear()
    ben=[]
    i=1
    data=request.get_json()
    for dict in data['Ben']:
        if dict['OwnerType']=='Legal Entity':
            parent="LegalEntity"+str(i)
            beneficials[parent]=dict
            i=i+1
        for key, value in dict.items():
            print(key, ":", value)
            if key=='BenName':
                ben.append(value)
                
    print(beneficials)

    sanctionDetail['BenOwner']=ben
    return "success"


@app.route('/LegalBos',methods=['GET','POST'])
def LegalBos():
    print("in legal")
    data=request.get_json()
    for dict in data['Ben']:
        for key, value in dict.items():
            print(key, ":", value)

    return "success"



@app.route('/getLegal',methods=['GET','POST'])
def getLegal():
    legal_entity_data.clear()
    individual_data.clear()
    for data in beneficials.values():
        print(data)
    # check the OwnerType key
        if data['OwnerType'] == 'Legal Entity':
            legal_entity_data.append(data['BenName'])
        elif data['OwnerType'] == 'Individual' or 'individual':
            
            individual_data.append(data['BenName'])
    print(legal_entity_data)
    return jsonify(legal_entity_data)

@app.route('/Directors',methods=['GET','POST'])
def Directors():
    print("in director")
    Dir=[]
    data=request.get_json()
    j=0
    for dict in data['Ben']:
        for key, value in dict.items():
            print(key, ":", value)
            if key=='dname':
                Dir.append(value)
                j=j+1
    
    sanctionDetail['Director']=Dir

    return "success"

@app.route('/Products',methods=['GET','POST'])
def Products():
    print("in prod")
    data=request.get_json()
    for dict in data['Ben']:
        for key, value in dict.items():
            print(key, ":", value)

    return "success"

@app.route('/getSanction',methods=['GET','POST'])
def getSanction():
    data = sanctionDetail
    print(data)
    return jsonify(data)



@app.route('/ExistingClient', methods=['GET', 'POST'])
def ExistngClient():
    print("in existing client")
    cur=mysql.connection.cursor()

    # Get the current page number from the URL parameters
    page = request.args.get('page', 1, type=int)
    # Calculate the offset for the SQL query based on the current page number
    offset = (page - 1) * PER_PAGE


    cur.execute("SELECT id FROM userinfo WHERE email=%s", (session['user_email'],))
    mysql.connection.commit()
    id=cur.fetchone()
    print(id)
    cur.execute("SELECT * FROM clientdetail where Admin_id=%s LIMIT %s OFFSET %s", (id,PER_PAGE,offset))
    mysql.connection.commit()
    client=cur.fetchall()
    # Get the total number of records in the table
    cur.execute("SELECT COUNT(*) FROM clientdetail")
    total_records = cur.fetchone()[0]
     # Calculate the total number of pages
    total_pages = int(total_records / PER_PAGE) + (total_records % PER_PAGE > 0)
    print(client)
    return render_template('ExistingClient.html', clients=client, page=page, total_pages=total_pages)

if __name__ == '__main__':
   app.run(host='0.0.0.0',port='8800',debug=True)