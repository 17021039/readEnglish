$(document).ready(function() {
    let mode = 'light';

    $('#read').click(function() {
        axios.post('/read', {path: $('select[name=path]').val()}).then((res) => {
            let data = res.data;
            let content = data.split('\n');
            let innerContent = document.createElement('div');
            let contentHTML = document.createElement('div');
            contentHTML.className = "section";
            if(mode === 'dark') {
                contentHTML.style = "background-color: black; color: gray;";
            }
            let headTitle = ['Prologue','Chapter','Epilogue','Bonus Short Stories','Intermission:','Afterword','Extra Chapter','Extra Episode'];

            for(let row of content) {
                if(row[1]) {
                    if(headTitle.find(title => row.indexOf(title) === 0)) {
                        if(row.indexOf('Prologue') !== 0) {
                            innerContent.appendChild(contentHTML);
                            contentHTML = document.createElement('div');
                            contentHTML.className = "section";
                            if(mode === 'dark') {
                                contentHTML.style = "background-color: black; color: gray;";
                            }
                        }
                        let title = document.createElement('h1');
                        title.innerHTML = '&emsp;';
                        let inner = document.createElement('strong');
                        inner.appendChild(document.createTextNode(row))
                        title.appendChild(inner);
                        contentHTML.appendChild(title);
                    }
                    else {
                        let rowHTML = document.createElement('p');
                        if(row.indexOf('★') !== 0 || row.indexOf('＊ ＊ ＊') !== 0)
                            rowHTML.innerHTML = '&emsp;&nbsp;';
                        else {
                            rowHTML.style = "text-align: center; font-size: 60px; color: purple;"
                            row =  "------" + row[0] + "------";
                        }
                        
                        if(row.indexOf('#') === 0) {
                            contentHTML.appendChild(document.createElement('br'));
                            row = row.substr(1).trim();
                            let title = document.createElement('h2');
                            title.innerHTML = '&emsp;';
                            let inner = document.createElement('strong');
                            inner.appendChild(document.createTextNode(row))
                            title.appendChild(inner);
                            contentHTML.appendChild(title);
                        }
                        else {
                            rowHTML.appendChild(document.createTextNode(row));
                            contentHTML.appendChild(rowHTML);
                        }  
                    }      
                }
            }
            innerContent.appendChild(contentHTML);
            $('#content').html(innerContent);
        }).catch(err => {
            let message = {};
            if(err.response) {
                message = err.response.data;
            }
            message.error = err;
            alert(JSON.stringify(message,null,4));
        })
    })

    $('#send').click(function() {
        let content = $(' textarea[name=content]').val() ? $(' textarea[name=content]').val().split('\n') : [];
        let contentHTML = document.createElement('div');
        for(let row of content) {
            if(row) {
                let rowTitle = document.createElement('h3');
                rowTitle.innerHTML = '&emsp; ';
                let inner = document.createElement('strong');
                inner.appendChild(document.createTextNode(row))
                rowTitle.appendChild(inner);
                contentHTML.appendChild(rowTitle);
                break;
            }
        }

        content.shift();
        for(let row of content) {
            if(row) {
                let rowHTML = document.createElement('p');
                rowHTML.innerHTML = '&emsp; ';
                rowHTML.appendChild(document.createTextNode(row));
                contentHTML.appendChild(rowHTML);
            }
        }
        $('#content').html(contentHTML);
        $(' textarea[name=content]').val('');
    })

    $('button').click(function() {
        switch (this.dataset.set) {
            case 'light':
                mode = 'light';
                $('.section').css({"background-color": " rgb(219, 219, 219)", "color": "black"});
                break;
            case 'dark':
                mode = 'dark';
                $('.section').css({"background-color": "black", "color": "gray"});
                break;
            default:
                break;
        }
        // $('#content')
    })

    $("#back-to-top").click(function() {
        return $("body, html").animate({scrollTop:0},400),!1}
    );

});