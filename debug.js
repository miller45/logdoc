
initDocFeatures();
initDebug();


function initDocFeatures() {
    $(document).ready(function () {
        // http://tfs.roseninspection.net:8080/tfs/CBSWCollection/BSWEB/Logistics%20Team/_api/_versioncontrol/itemContent?repositoryId=&path=%24%2FBSWEB%2FDevBranches%2FLogisticsBSWEB%2Fbsweb%2Fassets%2FobjectInformation%2Foi-variables.less&version=&contentOnly=false&__v=5 HTTP/1.1
        //assets/oi-variables.less
        $.get("assets/oi-variables.less", function(data) {
            $('#oi-variables-dump').val(data);
            var matchArray=parseLessColors(data);
            var showhtml=transformColorsToHtmlPreview(matchArray);
            $('#oi-colorpreview').html(showhtml);
        }).fail(function(err) {
            $('#oi-variables-dump').val("error getting oi-variables.less");
        });

    });
}

function initDebug() {

    $(document).ready(function () {



        var shiftIsOn = false;
        var ctrlIsOn = false;
        var vgridIsOn = false;
        var hgridIsOn = false;
        var stencilIsOn = false;

        $("body").append(
            '<div id="hgrid" style="z-index:100000;position:absolute;top:0px;left:0px;width:1920px; height:4000px;background-repeat:repeat-y;pointer-events:none"> </div>'
        );
        $('#hgrid').css('background-image', 'url(assets/line.png)').hide();
        $("body").append(
            '<div id="vgrid" style="z-index:100001;opacity:0.5;position:absolute;top:0px;left:0px;width:1920px; height:1280px;background-repeat:repeat-x;pointer-events:none"> </div>'
        );
        $('#vgrid').css('background-image', 'url(assets/vline.png)').hide();

        $("body").append(
            '<div id="stencil" style="z-index:100002;opacity:0.5;position:absolute;top:80px;left:0px;width:1600px; height:860px;background-repeat:no-repeat;pointer-events:none"> </div>'
        );
        $('#stencil').css('background-image', 'url(assets/schablone2.png)').hide();

        var hgrid = $('#hgrid');
        var vgrid = $('#vgrid');
        var stencil = $('#stencil');


        //  $('p[data-bltext]').text("Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine.");            
        $(document).bind("keydown", function (event) {
            switch (event.which) {
                case 16:
                    shiftIsOn = true;
                    break;
                case 17:
                    ctrlIsOn = true;
                    break;
                case 38:
                    event.preventDefault();
                    var cy = hgrid.offset().top;
                    cy = cy - 1;
                    hgrid.css("top", cy);
                    break;
                case 40:
                    event.preventDefault();
                    var cy = hgrid.offset().top;
                    cy = cy + 1;
                    hgrid.css("top", cy);
                    break;
                case 37:
                    event.preventDefault();
                    var cx = vgrid.offset().left;
                    cx = cy - 1;
                    vgrid.css("left", cx);
                    break;
                case 39:
                    event.preventDefault();
                    var cx = vgrid.offset().left;
                    cx = cy + 1;
                    vgrid.css("left", cx);
                    break;
            }
            if (ctrlIsOn) {
                switch (event.which) {
                    case 50:
                        event.preventDefault();
                        if (hgridIsOn) {
                            hgridIsOn = false;
                            hgrid.hide();
                        } else {
                            hgridIsOn = true;
                            hgrid.show();
                        }
                        break;
                    case 51:
                        event.preventDefault();
                        if (vgridIsOn) {
                            vgridIsOn = false;
                            vgrid.hide();
                        } else {
                            vgridIsOn = true;
                            vgrid.show();
                        }
                        break;
                    case 52:
                        event.preventDefault();
                        var te = angular.element('.objectinformation .objectinformation-title-area');
                        if (te.eq(0).attr("style") != null) {
                            te.attr("style", null);
                            angular.element('.objectinformation .objectinformation-title-textblock h2').attr("style", null);
                        } else {
                            te.css("background-color", "#34495E");
                            angular.element('.objectinformation .objectinformation-title-textblock h2').css("color", "#80CFE7");
                        }
                        break;
                    case 53:
                        event.preventDefault();
                        if (stencilIsOn) {
                            stencilIsOn = false;
                            stencil.hide();
                        } else {
                            stencilIsOn = true;
                            stencil.show();
                        }
                        break;
                }
            }

        });
        $(document).bind("keyup", function (event) {
            if (event.which == 16) {
                shiftIsOn = false;
            } else
            if (event.which == 16) {
                ctrlIsOn = false;
            }
        });


    });

}


function parseLessColors(rawless) {
    var result=[];
    var rgxtxt='(@[a-zA-Z-]+) *: *(#[a-fA-F0-9]+) *;';
    var rgx=new RegExp(rgxtxt);
    var matchArray=rawless.match(/(@[a-zA-Z-]+) *: *(#[a-fA-F0-9]+) *;/g);
    for(var i=0; i<matchArray.length;i++) {
        var m=rgx.exec(matchArray[i]);
        result.push({varname: m[1], color: m[2]});
    }
    return result;
}

function transformColorsToHtmlPreview(nameColorArray) {
    var text="";
    for(var i=0; i<nameColorArray.length;i++) {
        text+="<div class='colorcube' style='background-color:"+nameColorArray[i].color+"'> </div><span class='colorname'>"+nameColorArray[i].varname+"</span><br/>";
    }
    return text;
}