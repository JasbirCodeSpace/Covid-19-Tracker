import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({ title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
                <h1 className="infoBox__cases">{cases}</h1>
                <Typography className="infoBox__total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
